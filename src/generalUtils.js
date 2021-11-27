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
                        rep
                    }
                }`,
                // variables: {"userId":"109314596484939776"}
            }),
            redirect: 'follow'
        })
        if(res.status != 200){
            throw new Error("Request Failed!")
        }
        res = await res.json()
        return res;
    }
    catch (e){
        return undefined;
    }
}