export async function getTopUsers(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `Bearer ${token}`);
    try{
        var res = await fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `query ExampleQuery {
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
                query: `query ExampleQuery($userId: ID!) {
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
                query: `query ExampleQuery($userId: ID!) {
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
                query: `query ExampleQuery($userId: ID!) {
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
                query: `query ExampleQuery($userId: ID!) {
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
