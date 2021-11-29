import * as React from 'react';
import {
    TextField,
    Autocomplete
} from '@mui/material/';
import { getTopUsers } from './generalUtils';
import PageContext from './PageContext';

export default class Search extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            users: undefined,
        }
        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;

        var result = await getTopUsers()
        if(result){
            this._isMounted && this.setState({
                users: result.data.users
            });
        }
        else{
            this._isMounted && this.setState({
                error: "Error loading users!"
            })
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        const users = (this.state.users === undefined ? [{username: "Select...", value: -1}]: this.state.users)
        return (
            <PageContext.Consumer>
                {({changeId})=> (
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={users}
                    getOptionLabel={(option)=> option.username}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField color="secondary" {...params} label={this.props.label} />}
                    onChange={(e,option)=>changeId(option.user_id)}
                    />
                )}
            </PageContext.Consumer>
        )
    };
}
