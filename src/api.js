// src/api.js
export const fetchSoldLands = () => {
  // Mock data to simulate API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, userAvatarUrl: "https://www.example.com/avatar1.jpg" },
        { id: 3, userAvatarUrl: "https://www.example.com/avatar2.jpg" },
        { id: 5, userAvatarUrl: "https://www.example.com/avatar3.jpg" },
        // Add more mock sold lands here
      ]);
    }, 1000);
  });
};
