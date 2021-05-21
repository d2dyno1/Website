import { readable } from 'svelte/store';

export const releaseEndpoint = readable('https://api.github.com/repos/files-community/files/releases/latest');
export const githubUrl = readable('https://github.com/files-community/files');
export const storeId = readable('9nghp3dx8hdx');