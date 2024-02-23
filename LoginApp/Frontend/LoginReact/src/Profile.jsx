import React, { useState, useEffect } from 'react';

function Profile({ email }) {
    const [fullName, setFullName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Fetch user information from the backend API after the component mounts
        fetchUserProfile(email);
    }, [email]);

    const fetchUserProfile = (email) => {
        // Make a GET request to fetch the user's profile information
        fetch('https://localhost:7220/api/User/get-fullname?email=' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication headers if required
            },
            // You may need to include credentials: 'include' if you're using cookies for authentication
            credentials: 'include' // Include credentials for cross-origin requests
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            // Extract the full name from the user profile data
            console.log("Response data:", data); // Log the response data
            setFullName(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // Handle error (e.g., display an error message)
        });
    };
    console.log("Full name state:", fullName);
    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2>Welcome, {fullName}!</h2>
                    {/* Add any additional profile information you want to display */}
                </>
            )}
        </div>
    );
}

export default Profile;
