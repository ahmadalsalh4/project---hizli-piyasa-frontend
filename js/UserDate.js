export async function GetUserDate(){
    const token = localStorage.getItem('authToken');
    if(token)
    {
        console.log(token)
        const response = await fetch('http://localhost:5000/me', {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        });
        if(response.ok)
        {
                    console.log(response)

            const userData = await response.json();
            console.log(userData)
            return userData;
        }
        else
        {
            localStorage.removeItem('authToken');
            return false;
        }     
    }
    else
        return false;
}
