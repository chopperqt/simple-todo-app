import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

const Task = ({handleCheckClick,task_text,itemId,task_done,handleDeleteClick}) => {
    return ( 
        <ListItem   dense button >
            <ListItemIcon >
              <Checkbox onClick={handleCheckClick}
                edge="start"
                checked={task_done}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': itemId }}
              />
            </ListItemIcon>
            <ListItemText id={itemId} primary={task_text}/>
            <ListItemSecondaryAction onClick={handleDeleteClick}>
              <IconButton edge="end" aria-label="cancel">
                <CancelIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
     );
}
 
export default Task;