import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { CarouselProvider, Slider, Slide,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { makeStyles } from '@mui/styles';
import "./Login.css";
import insta from "../Assets/Instagram.jpg";
import bg from '../Assets/insta.png'
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import { Link,useNavigate } from 'react-router-dom';
import { useContext ,useState} from 'react';
import { AuthContext } from '../Context/AuthContext';
export default function Login() {
    const store = useContext(AuthContext);
    console.log(store);
    const userStyles = makeStyles({
        text1: {
            color: "grey",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",

        },
        text2:{
            textAlign: "center",
        },
        card2: {
            height: '8vh',
            marginTop: '2%'
        }
    })
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {Login} = useContext(AuthContext);
    const classes = userStyles();

    const handleClick = async() => {
        try {
            setError("");
            setLoading(true);
            Login(email,pass);
            setLoading(false);
            navigate("/");
        } catch (error) {
            setError(error);
            setTimeout(() =>{
                setError("");
            }, 3000);
        }
    }
    return (
        <>
            <div className="login-wrapper">
                <div className="img-car" style={{backgroundImage:'url('+bg+')',backgroundSize:'cover'}}>
                    <div className="car">
                    <CarouselProvider visibleSlides={1} totalSlides={5} naturalSlideWidth={238} naturalSlideHeight={423} hasMasterSpinner isPlaying={true} infinite={true} dragEnabled={false} touchEnabled={false}>
                        <Slider>
                            <Slide index={0}><Image src={img1}/></Slide>
                            <Slide index={1}><Image src={img2}/></Slide>
                            <Slide index={2}><Image src={img3}/></Slide>
                            <Slide index={3}><Image src={img4}/></Slide>
                            <Slide index={4}><Image src={img5}/></Slide>
                        </Slider>
                </CarouselProvider>
                    </div>
                </div>
                <div className="login-card">
                    <Card variant="outlined">
                        <div className="insta-logo">
                            <img src={insta} alt="" />
                        </div>
                        <CardContent>
                            {error!=="" && <Alert severity="error">{error}</Alert>}
                            <TextField value={email} onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" />
                            <TextField  value={pass} onChange={(e)=>setPass(e.target.value)} id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" />
                            <Typography className={classes.text2} color="primary" variant="subtitle1">
                                Forget Password ?
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button disabled = {loading} onClick = {handleClick} color="primary" fullWidth={true} variant="contained">
                                Log in
                            </Button>
                        </CardActions>
                    </Card>
                    <Card variant="outlined" className={classes.card2}>
                        <CardContent>
                            <Typography className={classes.text1} variant="subtitle1">
                                Don't have an account ? <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
