import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyExchange";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from "../appStore";

export default function AddForm({ closeEvent }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [menutype, setMenutype] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const empCollectionRef = collection(db, "Menu");
  const setRows = useAppStore((state) => state.setRows);
  const [percent, setPercent] = useState(0);

  const createUser = async (url) => {
    await addDoc(empCollectionRef, {
      name: name,
      price: Number(price),
      menutype: menutype,
      category: category,
      file: url,
      date: String(new Date()),
    });
    getUsers();
    closeEvent();
    Swal.fire("Submitted!", "Your file has been submitted.", "success");
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const mtype = [
    {
      value: "Original",
      label: "Original",
    },
    {
      value: "Keju",
      label: "Keju",
    },
    {
      value: "Spesial",
      label: "Spesial",
    },
    {
      value: "Jumbo",
      label: "Jumbo",
    },
  ];

  const currencies = [
    {
      value: "Gorengan",
      label: "Gorengan",
    },
    {
      value: "Roti",
      label: "Roti",
    },
    {
      value: "Kue",
      label: "Kue",
    },
    {
      value: "Tradisional Snack",
      label: "Tradisional Snack",
    },
    {
      value: "Kripik",
      label: "Kripik",
    },
  ];

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleMenuTypeChange = (event) => {
    setMenutype(event.target.value);
  };

  const handlePicChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      Swal.fire("Failed!", "Please upload an image first!", "error");
    } else {
      const storageRef = ref(storage, `/files/${file.name}`);

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            createUser(url);
          });
        }
      );
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Tambah Produk
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={false}
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            label="Nama"
            size="small"
            sx={{ marginTop: "30px", minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={false}
            id="price"
            label="Harga"
            type="number"
            value={price}
            onChange={handlePriceChange}
            size="small"
            sx={{ minWidth: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={false}
            id="category"
            label="Kategori"
            select
            value={category}
            onChange={handleCategoryChange}
            size="small"
            sx={{ minWidth: "100%" }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={false}
            id="menutype"
            label="Menu Varian"
            select
            value={menutype}
            onChange={handleMenuTypeChange}
            size="small"
            sx={{ minWidth: "100%" }}
          >
            {mtype.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <input type="file" onChange={handlePicChange} accept="/image/*" /> 
          <p>{percent}% completed</p>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={handleUpload}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
