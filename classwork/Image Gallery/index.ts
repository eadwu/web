document.addEventListener("DOMContentLoaded", function ()
{
  const currentImageElement = document.getElementById("current") as HTMLImageElement;
  const otherImageElements = document.querySelectorAll("div > img");

  function onOtherImageClick (imageElement)
  {
    imageElement.addEventListener("click", function ()
    {
      currentImageElement.src = imageElement.src;
    });
  }

  for (let index = 0; index < otherImageElements.length; index++)
    onOtherImageClick(otherImageElements[ index ]);
});
