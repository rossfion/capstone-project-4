import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

const API_URL = "https://collectionapi.metmuseum.org";

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {content: "Waiting for data...Note: ID field is only used by Object By ID option."});
});

// get all object IDs
app.post("/get-objects", async (req, res) => {

    try {
        const result = await axios.get(API_URL + "/public/collection/v1/objects");
        console.log(result);
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response)});
    }
});

// get all department IDs
app.post("/get-departmentIds", async (req, res) => {

    try {
        const result = await axios.get(API_URL + "/public/collection/v1/objects?departmentIds=1");
        console.log(result);
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response)});
    }
});

// get by Metadata Date (Example: 2018-10-22)
app.post("/get-metadataDate", async (req, res) => {

    try {
        const result = await axios.get(API_URL + "/public/collection/v1/objects?metadataDate=2018-10-22");
        console.log(result);
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response)});
    }
});

// get specific object by ID (Format:0-9, example 437133)
app.post("/get-object", async (req, res) => {

    const searchId = req.body.objectID;
    try {
        const result = await axios.get(API_URL + "/public/collection/v1/objects/" + searchId);
        console.log(result);
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    } catch (error) {
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});
    }
});


app.use((req, res) => {
    // viewsData variable to be passed to the view file
    const viewsData = {
        pageTitle: 'No object found...'
    };
    res.status(404).render('404', viewsData);
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

