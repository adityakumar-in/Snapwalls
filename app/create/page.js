"use client";
import React, { useEffect, useState, useRef } from "react";
import Typed from "typed.js";
import { getAuth } from "firebase/auth";
import "/app/styles/create.css";
import "/app/styles/searchbar.css";
import { useRouter } from "next/navigation";
import { generatePollinationImage } from "/utils/pollinations";
import CreateSnapProgress from "@/components/CreateSnapProgress";
import CreatedSnap from "@/components/CreatedSnap";
import AddWallpaper from "@/components/AddWallpaper";
import AddNotification from "@/components/AddNotification";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Login from "@/components/Login";

const page = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const el = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const tags = ["Mobile", "Desktop"]; // Add more tags here
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const [generatedImages, setGeneratedImages] = useState(null);
  const numberOfVariations = 4; // Number of wallpapers to generate
  const [isAddWallpaperOpen, setIsAddWallpaperOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAddNotificationOpen, setIsAddNotificationOpen] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const isAdmin =
    user &&
    (user.uid === process.env.NEXT_PUBLIC_ADMIN_UID_1 ||
      user.uid === process.env.NEXT_PUBLIC_ADMIN_UID_2);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const typed = new Typed(el.current, {
      strings: ["Anime", "Aesthetic", "Actors", "Sports", "Animated", "Nature"],
      typeSpeed: 45,
      backSpeed: 40,
      loop: true,
    });

    return () => {
      unsubscribe();
      typed.destroy();
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "/") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleTagClick = (tag) => {
    // If clicking the same tag that's already selected, deselect it
    if (selectedTag === tag) {
      setSelectedTag("");
    } else {
      setSelectedTag(tag);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchInput(newValue);

    // Only try to match tag if the input exactly matches a tag name
    // This prevents unselecting when typing
    const matchingTag = tags.find(
      (tag) => tag.toLowerCase() === newValue.toLowerCase()
    );
    if (matchingTag) {
      setSelectedTag(matchingTag);
    }
  };

  const enhancePromptWithGemini = async (userPrompt) => {
    try {
      const prompt = `As an expert in creating prompts for image generation, enhance the following prompt to create a visually stunning image generation. Focus on adding details in according to the prompt, and add artistic style. Keep the image high quality. Keep the enhanced prompt concise but descriptive, just give me prompt only. Original prompt: "${userPrompt}"`;

      const result = await model.generateContent(prompt);
      const enhancedPrompt = await result.response.text();

      // Clean up the enhanced prompt by removing any quotes or prefixes
      return enhancedPrompt
        .replace(/^["']|["']$/g, "")
        .replace(/^Enhanced prompt: /i, "")
        .trim();
    } catch (error) {
      console.error("Error enhancing prompt with Gemini:", error);
      // If Gemini fails, return the original prompt
      return userPrompt;
    }
  };

  const generateSingleWallpaper = async (prompt, tag, index) => {
    // Increased resolution for ultra HD quality
    const dimensions =
      tag === "Mobile"
        ? { width: 2880, height: 5120 } // 5K for mobile (2x previous)
        : { width: 7680, height: 4320 }; // 8K for desktop (2x previous)

    const imageUrl = await generatePollinationImage(prompt, {
      width: dimensions.width,
      height: dimensions.height,
      model: "flux",
      seed: Date.now() + index, // Add different seed for variations
      num_inference_steps: 50, // Increase inference steps for better quality (default is usually 30)
      guidance_scale: 7.5, // Adjust guidance scale for better adherence to prompt
      scheduler: "dpm++_2m_karras", // Use a high-quality scheduler
    });

    // Create a new image object to ensure it's fully loaded
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    return imageUrl;
  };

  const handleCreate = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    if (!searchInput.trim()) {
      return;
    }

    try {
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      }
    } catch (error) {
      console.error("Error clearing cache:", error);
    }

    setIsGenerating(true);
    setProgressPercent(0);

    const progressTimer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 90) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + 2;
      });
    }, 200);

    try {
      const prompt = `Create a ${searchInput} Wallpaper${
        selectedTag ? ` for ${selectedTag}` : "Create a Animated Wallpaper"
      }`;
      const enhancedPrompt = await enhancePromptWithGemini(prompt);
      const generationPromises = [];

      // Generate multiple variations
      for (let i = 0; i < numberOfVariations; i++) {
        generationPromises.push(
          generateSingleWallpaper(enhancedPrompt, selectedTag, i)
        );
      }

      const imageUrls = await Promise.all(generationPromises);
      const wallpapers = imageUrls.map((url) => ({
        imageUrl: url,
        type: selectedTag || "Desktop",
      }));

      // Set progress to 100% and wait a moment
      setProgressPercent(100);

      // Wait for progress animation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear states and show generated images
      setIsGenerating(false);
      setProgressPercent(0);
      const currentPrompt = searchInput; // Store current prompt before clearing
      setSearchInput("");
      setSelectedTag("");
      setGeneratedImages({ wallpapers, prompt: currentPrompt });
    } catch (error) {
      console.error("Generation error:", error);
      setIsGenerating(false);
      setProgressPercent(0);
      clearInterval(progressTimer);
    }
  };

  useEffect(() => {
    const handleTagMouseMove = (e) => {
      const tag = e.currentTarget;
      const rect = tag.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / tag.clientWidth) * 100;
      const y = ((e.clientY - rect.top) / tag.clientHeight) * 100;
      tag.style.setProperty("--mouse-x", `${x}%`);
      tag.style.setProperty("--mouse-y", `${y}%`);
    };

    const handleButtonMouseMove = (e) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / button.clientWidth) * 100;
      const y = ((e.clientY - rect.top) / button.clientHeight) * 100;
      button.style.setProperty("--mouse-x", `${x}%`);
      button.style.setProperty("--mouse-y", `${y}%`);
    };

    const tags = document.querySelectorAll(".create-tag");
    const createButton = document.querySelector(".create-button");

    tags.forEach((tag) => {
      tag.addEventListener("mousemove", handleTagMouseMove);
    });

    if (createButton) {
      createButton.addEventListener("mousemove", handleButtonMouseMove);
    }

    return () => {
      tags.forEach((tag) => {
        tag.removeEventListener("mousemove", handleTagMouseMove);
      });
      if (createButton) {
        createButton.removeEventListener("mousemove", handleButtonMouseMove);
      }
    };
  }, []); // Empty dependency array since we want this to run once

  if (showLogin) {
    return <Login onClose={() => setShowLogin(false)} />;
  }

  if (generatedImages) {
    return (
      <CreatedSnap
        wallpapers={generatedImages.wallpapers}
        prompt={generatedImages.prompt}
      />
    );
  }

  return (
    <div>
      {isGenerating && <CreateSnapProgress progress={progressPercent} />}
      <div className="default-padding">
        <div className="create-search-container">
          <h1 className="create-search-heading">
            Generate <span className="bold" ref={el} />
          </h1>
          <div className="search-container">
            <div className="search-input-container">
              <div className="explore-search-icon">
                <svg
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z"
                      stroke="#606060"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M15.989 15.4905L19.5 19.0015"
                      stroke="#606060"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Describe your Wallpaper"
                value={searchInput}
                onChange={handleInputChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchInput.trim()) {
                    handleCreate();
                  }
                }}
              />
              <div className={`search-slash ${isInputFocused ? "hidden" : ""}`}>
                /
              </div>
              <button
                className="search-clear"
                onClick={() => {
                  setSearchInput("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="create-tags-container">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`create-tag ${selectedTag === tag ? "active" : ""}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="create-buttons-container">
            <div className="create-buttons-row">
              <button className="create-button" onClick={handleCreate}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5L12 19M5 12L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Create
              </button>
              {(user?.uid === process.env.NEXT_PUBLIC_ADMIN_UID_1 ||
                user?.uid === process.env.NEXT_PUBLIC_ADMIN_UID_2) && (
                <button
                  className="upload-trigger-button"
                  onClick={() => {
                    if (!user) {
                      alert("Please login to upload wallpapers");
                      return;
                    }
                    setIsAddWallpaperOpen(true);
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16L12 8M12 8L15 11M12 8L9 11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 15V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16V15M3 15V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V15M3 15H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Upload
                </button>
              )}
            </div>
            {(user?.uid === process.env.NEXT_PUBLIC_ADMIN_UID_1 ||
              user?.uid === process.env.NEXT_PUBLIC_ADMIN_UID_2) && (
              <button
                className="notification-trigger-button"
                onClick={() => {
                  if (!user) {
                    alert("Please login to add notifications");
                    return;
                  }
                  setIsAddNotificationOpen(true);
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12S6.47715 2 12 2s10 4.47715 10 10-4.47715 10-10 10z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16H12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add Notification
              </button>
            )}
          </div>
        </div>
      </div>

      <AddWallpaper
        isOpen={isAddWallpaperOpen}
        onClose={() => setIsAddWallpaperOpen(false)}
      />
      {isAdmin && isAddNotificationOpen && (
        <AddNotification
          isOpen={isAddNotificationOpen}
          onClose={() => setIsAddNotificationOpen(false)}
        />
      )}
    </div>
  );
};

export default page;
