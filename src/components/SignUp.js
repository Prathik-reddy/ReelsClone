import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import insta from "../Assets/Instagram.jpg";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';
import "./SignUp.css";

export default function SignUp() {
    const userStyles = makeStyles({
        text1: {
            color: "grey",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem !important",
            textAlign: "center",

        },
        card2: {
            height: '8vh',
            marginTop: '2%'
        }
    })
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { SignUp } = useContext(AuthContext);
    const classes = userStyles();

    const handleClick = async (e) => {
        e.preventDefault();
        if (!(email||pass||name||file)) {
            setError("Pls upload all details to SignUp");
            setTimeout(() => {
                setError("");
            }, 3000)
            return;
        }
        try {
            setError("");
            setLoading(true);

            let userObj = await SignUp(email, pass);
            let uid = userObj.user.uid;
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`)
            }

            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false)
                return;
            }

            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullname: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })
                })
                setLoading(false);
                navigate('/');
            }

        } catch (error) {
            setError(error);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }
    return (
        <>
            <div className="signup-wrapper">
                <div className="signup-card">
                    <Card variant="outlined">
                        <div className="insta-logo">
                            <img src={insta} alt="" />
                        </div>
                        <CardContent>
                            <Typography className={classes.text1} variant="subtitle1">
                                Sign up to see photos and videos from your friends
                            </Typography>
                            {error !== "" && <Alert severity="error">{error}</Alert>}
                            <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" />
                            <TextField value={pass} onChange={(e) => setPass(e.target.value)} id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" />
                            <TextField value={name} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" />
                            {!file?<Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="label">
                                Upload Profile Image
                                <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files[0])} />
                            </Button>:<Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CheckCircleIcon />} component="label">Image Uploaded</Button>}
                        </CardContent>
                        <CardActions>
                            <Button disabled={loading} onClick={handleClick} color="primary" fullWidth={true} variant="contained">
                                Sign up
                            </Button>
                        </CardActions>
                        <CardContent>
                            <Typography className={classes.text1} variant="subtitle1">
                                By signing up, you agree to our Terms, Conditions and Cookies policy.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined" className={classes.card2}>
                        <CardContent>
                            <Typography className={classes.text1} variant="subtitle1">
                                Having an account ? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}