import * as React from 'react';
import {
    TextField,
    Autocomplete
} from '@mui/material/';
import { getTopUsers } from './generalUtils';

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
        return (
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={this.state.users}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={this.props.label} />}
            />
            
        )
    };
}