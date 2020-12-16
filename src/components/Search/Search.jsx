import {
    Button,
    TextField,
} from '@material-ui/core';



import './style.css';

const Search = ({
    handleInputChange,
    addInputValue,
    handleAddClick,
    clickSearchTask,
    error
    }) => {

    return ( 
        <section className="search">
            <div className="container">
                <TextField onChange={handleInputChange} id="search_textFiled outlined-basic" label="Search or add task" variant="outlined" value={addInputValue}  />
                <Button variant="contained" color="primary" size="large" onClick={handleAddClick}>Add task</Button>
                <Button variant="contained" color="primary" size="large" onClick={clickSearchTask}>Search task</Button>
            
        

            </div>
            <div></div>
        </section>
    );
}
 
export default Search;