import React ,{useState} from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuid} from 'uuid';
import {database, storage } from "../firebase";


const UploadFile = (props) => {
    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [upload, setUpload] = useState("Upload video");

    const handleChange = async (file) =>{
        if(file.type === null){
            setError("Pls select a file to upload!");
            setTimeout(() =>{
                setError("");
            }, 3000);
            return;
        }
        if(file.size/(1024*1024)>100){
            setError("Pls upload a file less than 100 MB");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        setLoading(true);
        let uid = uuid();

        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on("state_changed", progress, error, success);

        function progress(snapshot) {
            setUpload("Uploading Video ...")
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes )*100;
            console.log(`uploaded ${progress} %`);
        }

        function error(err) {
            setError(err);
            setTimeout(() => {
            setError(null);

            }, 2000);
            setLoading(false);
            return;
        }
        function success() {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                let obj = {
                    likes : [],
                    comments : [],
                    pId : uid,
                    pUrl:url,
                    uName : props.user.fullname,
                    uProfile : props.user.profileUrl,
                    userId : props.user.userId,
                    createdAt : database.getTimeStamp(),
                }
                database.posts.add(obj).then(async(ref)=>{
                    let res =await database.users.doc(props.user.userId).update({
                        postIds : props.user.postIds != null ? [...props.user.postIds,ref.id]:[ref.id]
                    })
                }).then(() => {
                    setLoading(false);
                    setUpload("Video uploaded");
                }).catch((err) => {
                    setError(err);
                    setTimeout(() =>{
                        setError("");
                    }, 3000)
                    setLoading(false);
                })
            })
        }


    }
    return (
        <div>
            {
                error !== "" ? <Alert severity="error">{error}</Alert>:
                (
                    <>
                        <input accept = "video/*" id = "upload-input" type="file" style={{display: "none"}} onChange={(e)=>{handleChange(e.target.files[0])}} />

                        <label htmlFor="upload-input">
                            <Button variant="outlined"  color="secondary" component="span">
                                <CloudUploadIcon/>&nbsp; {upload}
                            </Button>
                        </label>
                        {loading?<LinearProgress color="secondary"  style={{marginTop:'3%'}} />:""}
                    </>
                )
            }
        </div>
    )
}

export default UploadFile
