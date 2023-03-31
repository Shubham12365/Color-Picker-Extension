const btn= document.querySelector('.changeColorbtn');
const colorGrid= document.querySelector('.colorGrid');
const colorValue= document.querySelector('.colorValue');

btn.addEventListener('click', async ()=>{
    // console.log("clicked");
    let [tab]= await chrome.tabs.query({active:true, currentWindow: true});
    const color= chrome.storage.sync.get('color',({color})=>{
        console.log('color: ', color);
    })

    chrome.scripting.executeScript({
        // we need to inject a script using function pickcolor in the webpage

        target : { tabId: tab.id },
        function : pickColor,
    },async(injectionResults)=>{

        const [data] =injectionResults;
        if(data.result ){//to check data.result is not null
            const color= data.result.sRGBHex;
            colorGrid.style.background= color;
            colorValue.innerText= color;

            
            try{
                // Using navigator apis  This helps to automatically copies the color in our clipboard
                await navigator.clipboard.writeText(color);
            } catch(err){
                console.error(err);
            }

        }
        console.log(injectionResults);
    });
});

async function pickColor(){
    try{
        //Picker
        //We can directly take native APIs of chrome for color picker
        const eyeDropper= new EyeDropper();
        //To activate and return the color we want we use await
        //Also if we want to use await we have to make the function async
        //console.log(selectColor);// we have to send this color to the above chrome.scripting process
        return await eyeDropper.open();
    }
    catch(err){
        console.log(err);
    }
}

pickColor();