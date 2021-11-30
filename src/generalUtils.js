export async function getTopUsers(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `query {
                    users {
                        user_id,
                        rep,
                        username,
                        avatar
                    }
                }`,
                // variables: {"userId":"109314596484939776"}
            }),
            redirect: 'follow'
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}

export async function getUserInfo(userId){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `query($userId: ID!) {
                            user(user_id: $userId) {
                            user_id,
                            rep,
                            username,
                            avatar,
                            bio,
                            total_trans
                            }
                        }`,
                variables: {"userId":userId}
            }),
            redirect: 'follow'
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}

export async function getUserTrans(userId){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `query($userId: ID!) {
                            usertransactions(user_id: $userId) {
                            transaction_id,
                            sender,
                            receiver,
                            time,
                            action_id
                            }
                        }`,
                variables: {"userId":userId}
            }),
            redirect: 'follow'
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}

export async function getGames(userId){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `query($userId: ID!) {
                            games(user_id: $userId) {
                            user_id,
                            game_name
                        }
                    }`,
                variables: {"userId":userId}
            }),
            redirect: 'follow'
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}

export async function getMyInfo(tokenType, accessToken){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}

export async function login(userId){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `query($userId: ID!) {
                            login(user_id: $userId) {
                            user_id,
                            token,
                            expiration
                        }
                    }`,
                variables: {"userId":userId}
            }),
            redirect: 'follow'
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}

export async function changeBio(userId, bio, token){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `mutation($userId: ID!, $bio: String!) {
                            editBio(user_id: $userId, bio: $bio) {
                                bio
                            }
                        }`,
                variables: {"userId":userId, "bio":bio}
            }),
            redirect: 'follow'
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}

export async function changeGames(userId, names, token){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `mutation($userId: ID!, $names: [String!]) {
                            modifyGames(user_id: $userId, names: $names) {
                                game_name
                            }
                        }`,
                variables: {"userId":userId, "names":names}
            }),
            redirect: 'follow'
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}

export async function curse(senderId, receiverId, token){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `mutation($senderId: ID!, $receiverId: ID!) {
                            curse(sender: $senderId, receiver: $receiverId) {
                                rep
                            }
                        }`,
                variables: {"senderId":senderId, "receiverId":receiverId}
            }),
            redirect: 'follow'
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}

export async function thank(senderId, receiverId, token){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `mutation($senderId: ID!, $receiverId: ID!) {
                            thank(sender: $senderId, receiver: $receiverId) {
                                rep
                            }
                        }`,
                variables: {"senderId":senderId, "receiverId":receiverId}
            }),
            redirect: 'follow'
        })
        if(res.status !== 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}
