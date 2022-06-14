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

    var data = await respones;

    if(!BreedsData.length)
    {
        BreedsData = data;
        showBreedsDetailSelect(BreedsData);
    }

    return data;
}

//Get Breeds Api Data 
getapi(BreedsUrl);

//set the breeds detail into select option
function showBreedsDetailSelect(data) {
    let selectValue = `<option value="">Select Breeds</option>`;

    for (let i = 0; i < data.length; i++) {
        selectValue += `<option value="${data[i].id}">${data[i].name}</option>`;
    }
    $("#breedSelect").html(selectValue);
}