import React ,{useState} from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';


const UploadFile = () => {
    const [error, setError] = useState("");
    const [loading,setLoading] = useState(true);

    const handleChange = () =>{

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
                                <CloudUploadIcon/>&nbsp; Upload video
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
