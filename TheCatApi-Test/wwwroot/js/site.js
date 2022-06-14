'use strict'

//Main Breed Select
const BreedSelectID = $("#breedSelect");

//Breed Image ID
const BreedImageID = $("#Breed_image");

//End Point
const BreedsUrl = 'https://localhost:5001/api/Breeds';
const ImageUrl  = 'https://localhost:5001/api/Image/breed_id=';


//Create Array
let BreedsData = [];
let BreedsImageData = [];
let catData = [];

//Create a async Fetch function

async function getapi(url)
{
    const respones = 
            fetch(url)
                .then(data=>{return data.json()})
                .catch(console.error());

    var data = await response;

    if(!BreedsData.length)
    {
        BreedsData = data;
    }

    retrun data;
}

//Get Breeds Api Data 
getapi(BreedsUrl);