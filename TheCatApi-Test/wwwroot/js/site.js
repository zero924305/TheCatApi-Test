'use strict'

//Main Breed Select
const BreedSelectID = $("#breedSelect");

//Breed Image ID
const BreedImageID = $("#Breed_image");

//End Point
const BreedsUrl = '/api/Breeds';
const ImageUrl  = '/api/Image/breed_id=';


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

//Set selector change function 
BreedSelectID.change(async function () {
    let breed_id = BreedSelectID.val();
    if (!breed_id)
        triggerBreedDetailModel(breed_id);

    let url = ImageUrl.concat(breed_id);
    let result = searchDetail(BreedsData, breed_id);
    catData = result;

    BreedsImageData = await getapi(url);
    console.log(BreedsImageData);

    GetSelectBreedData(catData);
    BreedImageID.attr("src",BreedsImageData[0].url);
    triggerBreedDetailModel(breed_id);
})


//Replace html elements by ID
function GetSelectBreedData(BreedData) {
    let BreedName = $(".Breed_Name");
    let ModalDetailId = $("#BreedUrlDetail");
    let Breed_CountryCode = $("#Breed_CountryCode");
    let Breed_Origin = $("#Breed_Origin");
    let Breed_Temperament =$("#Breed_Temperament");
    let Breed_SocialNeeds = $("#Breed_SocialNeeds");
    let Breed_StrangerFriendly = $("#Breed_StrangerFriendly");
    let Breed_LifeSpan = $("#Breed_LifeSpan");
    let Breed_Description = $("#Breed_Description");

    ChangeAllValueWithSameId(BreedName, BreedData.name);
    ChangeAllValueWithSameId(Breed_CountryCode, BreedData.country_code);
    ChangeAllValueWithSameId(Breed_Origin, BreedData.origin);
    ChangeAllValueWithSameId(Breed_Temperament, BreedData.temperament);
    ChangeAllValueWithSameId(Breed_SocialNeeds, BreedData.social_needs);
    ChangeAllValueWithSameId(Breed_StrangerFriendly, BreedData.stranger_friendly);
    ChangeAllValueWithSameId(Breed_LifeSpan, BreedData.life_span);
    ChangeAllValueWithSameId(Breed_Description, BreedData.description);

    ModalDetailId.attr("src", BreedData.wikipedia_url);
}


//Trigger the model by value
function triggerBreedDetailModel(data) {
    if (!data)
        $("#collapseExample").collapse('hide');
    else
        $("#collapseExample").collapse('show');
}

//Search by input value
function searchDetail(object, value) {
    return object.find((item) => item.id === value);
}

//Set Image src by value
function DisplayBreedsImage(ImageTagID, BreedImageData) {
    return ImageTagID.attr("src", BreedImageData);
}

//Replace all html element in for loop
function ChangeAllValueWithSameId(id, value) {
    for (let i = 0; i < id.length; i++) {
        id[i].innerHTML = value;
    }
}
