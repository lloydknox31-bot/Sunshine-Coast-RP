
const ROBLOX_USERS_API = 'https://users.roblox.com/v1';

async function robloxRequest(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000),
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });

    if (!response.ok) {
        throw new Error(
            `Roblox API request failed: ${response.status}`
        );
    }

    return response.json();
}

// Find a Roblox account using its username
export async function getRobloxUserByUsername(username) {
    const cleanUsername = username.trim();

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(cleanUsername)) {
        throw new Error('Invalid Roblox username.');
    }

    const data = await robloxRequest(
        `${ROBLOX_USERS_API}/usernames/users`,
        {
            method: 'POST',
            body: JSON.stringify({
                usernames: [cleanUsername],
                excludeBannedUsers: true
            })
        }
    );

    const user = data.data?.[0];

    if (!user) {
        throw new Error('Roblox account not found.');
    }

    return {
        id: user.id,
        username: user.name,
        displayName: user.displayName
    };
}

// Retrieve a Roblox account's public profile
export async function getRobloxUserById(userId) {
    const id = String(userId);

    if (!/^\d+$/.test(id)) {
        throw new Error('Invalid Roblox user ID.');
    }

    return robloxRequest(
        `${ROBLOX_USERS_API}/users/${id}`
    );
}

// Check whether the user's profile contains
// their exact one-time verification code
export async function checkRobloxVerificationCode(
    userId,
    verificationCode
) {
    const profile = await getRobloxUserById(userId);

    const description = profile.description || '';

    return description
        .split(/\s+/)
        .includes(verificationCode);
}
