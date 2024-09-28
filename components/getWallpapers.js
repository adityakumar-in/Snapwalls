import fs from 'fs/promises';
import path from 'path';
import Wallpaper from './Wallpaper';

async function getWallpapers() {
  const wallpaperDir = path.join(process.cwd(), 'public', 'wallpapers');
  const files = await fs.readdir(wallpaperDir);
  
  const wallpaperFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  const fileNames = wallpaperFiles.map(file => path.parse(file).name);

  return { wallpapers: wallpaperFiles, fileNames };
}

export default async function WallpaperLoader() {
  const { wallpapers, fileNames } = await getWallpapers();
  
  return <Wallpaper wallpapers={wallpapers} fileNames={fileNames} />;
}