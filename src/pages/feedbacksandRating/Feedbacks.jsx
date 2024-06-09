import React from 'react';
import { useLoaderData } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

// eslint-disable-next-line react/prop-types
const FeedbackCard = ({ feedback }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className="max-w-sm mb-4 shadow-lg h-min">
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="feedback">
                        {feedback.participantImage ? <img src={feedback.participantImage} alt="avatar" className="w-full h-full object-cover rounded-full" /> : feedback.participant.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={feedback.participant}
                subheader={feedback.dateTime}
                className="bg-gray-100"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" >
                Camp <span className='font-taj text-2xl font-bold ml-2'> {feedback.campName}</span>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <div className='ml-[45%]'><Typography paragraph>Feedback</Typography></div>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {feedback.feedback}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

const Feedbacks = () => {
    const feedbacks = useLoaderData();

    return (
        <div className="my-20 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Feedbacks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {feedbacks.map(feedback => (
                    <FeedbackCard
                        key={feedback._id}
                        feedback={feedback}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feedbacks;
