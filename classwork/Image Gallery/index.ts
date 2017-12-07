document.addEventListener("DOMContentLoaded", function ()
{
  var currentImageElement = document.getElementById("current") as HTMLImageElement;
  var otherImageElements = document.querySelectorAll("div > img");

  function onOtherImageClick (imageElement)
  {
    imageElement.addEventListener("click", function ()
    {
      currentImageElement.src = imageElement.src;
    });
  }

  for (var index = 0; index < otherImageElements.length; index++)
    onOtherImageClick(otherImageElements[ index ]);
});
