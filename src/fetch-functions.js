export const getFirstThreeFantasyBooks = async () => {
    try {
        const res = await fetch('https://openlibrary.org/subjects/fantasy.json');
        if(!res.ok) console.warn("Failed to get fantasy books")
        const data = await res.json();
        const spliced = data.works.splice(0, 3);
        return spliced.map(book => {
            return {
                title: book.title,
                author: {
                    name: book.authors[0].name,
                    urlKey: book.authors[0].key
                },
                coverUrl: `https://covers.openlibrary.org/a/id/${book.cover_id}-M.jpg`
            }
        });
    }
    catch(error){
        console.warn(error)
        return null
    }
};

export const getAuthor = async (urlKey) => {
    try {const url = `https://openlibrary.org${urlKey}.json`;
        const res = await fetch(url);
        if(!res.ok) console.warn("Failed to get author")
        const data = await res.json();
        const obj =  {
            birthDate: data.birth_date,
            bio: data.bio,
            wikipediaUrl: data.wikipedia,
            name: data.name,
            pictureUrl: `https://covers.openlibrary.org/a/id/${data.photos[0]}-M.jpg`
        }
        return obj;
    } catch(error){
        console.warn(error);
        return null;
    }
};

export const createNewUser = async (userObj) => {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userObj)
        })
        if(!res.ok) console.warn("Failed to create new user");
        return await res.json()
    } catch(error){
        console.warn(error);
        return null;
    }
}