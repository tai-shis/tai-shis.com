
export type File = {
  name: string;
  path: string;
  route: string;
  isActive: boolean;
}

export type Directory = {
  name: string;
  path: string;
  isExpanded: boolean;
  isActive: boolean;
  files?: File[];
  subfolders?: Directory[];
}

const unsortedFiles: Directory = {
  name: "/", // root folder
  path: "/",
  isExpanded: true,
  isActive: false,
  subfolders: [
    {
      name: "hobbies",
      path: "/hobbies",
      isExpanded: true,
      isActive: true,
      files: [
        {
          name: "index.tsx",
          route: "/hobbies",
          path: "/hobbies/index.tsx",
          isActive: true,
        },
      ],
      subfolders: [
        {
          name: "mechanical-keyboards",
          path: "/hobbies/mechanical-keyboards",
          isExpanded: false,
          isActive: false,
          files: [
            {
              name: "index.tsx",
              route: "/hobbies/mechanical-keyboards/",
              path: "/hobbies/mechanical-keyboards/index.tsx",
              isActive: false,
            }
          ],
        },
        {
          name: "music",
          path: "/hobbies/music",
          isExpanded: false,
          isActive: false,
          files: [
            {
              name: "index.tsx",
              route: "/hobbies/music/",
              path: "/hobbies/music/index.tsx",
              isActive: false,
            }
          ],
        },
        {
          name: "fashion",
          path: "/hobbies/fashion",
          isExpanded: false,
          isActive: false,
          files: [
            {
              name: "index.tsx",
              route: "/hobbies/fashion/",
              path: "/hobbies/fashion/index.tsx",
              isActive: false,
            },
          ],
        },
        {
          name: "audiophile",
          path: "/hobbies/audiophile",
          isExpanded: false,
          isActive: false,
          files: [
            {
              name: "index.tsx",
              route: "/hobbies/audiophile/",
              path: "/hobbies/audiophile/index.tsx",
              isActive: false,
            },
          ],
        },
        {
          name: "photography",
          path: "/hobbies/photography",
          isExpanded: false,
          isActive: false,
          files: [
            {
              name: "index.tsx",
              route: "/hobbies/photography/",
              path: "/hobbies/photography/index.tsx",
              isActive: false,
            },
          ],
        },
      ],
    },
  ],
}

export const directory: Directory = sortDirectory(unsortedFiles);

export function sortDirectory(directory: Directory): Directory {
  directory.files?.sort((file1, file2) => file1.name.localeCompare(file2.name));
  directory.subfolders?.sort((directory1, directory2) => directory1.name.localeCompare(directory2.name));
  directory.subfolders?.forEach(subfolder => sortDirectory(subfolder));
  return directory;
}
