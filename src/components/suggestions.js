// const vercelurl="https://socialmedia-backend-2njs.onrender.com";
const vercelurl="https://friendsbookweb.up.railway.app";
async function fetchUserSuggestions() {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${vercelurl}/user/suggestions`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Unauthorized access');
        }

        const data = await response.json();
        console.log("Suggestion data:", data);
        const suggestionsContainer = document.getElementById('suggestions-container');

        suggestionsContainer.innerHTML = '';

        if (data.users && Array.isArray(data.users)) {
            data.users.forEach(user => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.classList.add('suggestion');

                suggestionDiv.innerHTML = `
                    <div class="suggestion-top">
                        <img src="${user.profilePic || 'https://via.placeholder.com/35'}" alt="${user.username}" class="profile-pic">
                        <p class="username">@${user.username}</p>
                        <p class="bio">${user.bio || 'No bio available'}</p>
                    </div>
                    <button class="follow-btn">Follow</button>
                `;

                suggestionsContainer.appendChild(suggestionDiv);
            });
        } else {
            console.error("Unexpected data format:", data);
        }
    } catch (error) {
        console.error('Failed to fetch user suggestions:', error);
    }
}

export { fetchUserSuggestions };
