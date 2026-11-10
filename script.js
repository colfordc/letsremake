// Edit this project list to change titles, descriptions, image filenames, and captions.
const projects = [
  {
    term: "a storefront for music.",
    description: "A renovation of a storefront in North Attleborough, MA to serve as a music school for Cadence Music Academy. The program includes spaces for individual and group lessons, an office, and a waiting area. 2026",
    images: [
      {file:"images/cadence-1v2.JPG"},
      {file:"images/cadence-2v2.JPG"},
      
    ]
  },
  {
    term: "what a gallery can be.",
    description: "Give and Take, an exhibition at the Yale School of Architecture's North Gallery. The project reimagined the gallery as a space solely for giving and receiving gifts, positing reciprocity, delight, and surprise as key aspects of intellectual life. —with Clare Fentress and Dilara Karademir, 2022",
    images: [
      {file:"images/gallery-1.jpg"},
      {file:"images/gallery-2.jpg"},
      {file:"images/gallery-3.jpg"},
      
    ]
  },
  {
    term: "a lampshade.",
    description: "An exploration of light, shade, and shadow and process-led design. 2026",
    images: [
      {file:"images/lampshade-1.jpg"},
      {file:"images/lampshade-2.jpg"},
      {file:"images/lampshade-3.jpg"}
    ]
  },
  {
    term: "teaching tools.",
    description: "Sample model of the MIT Chapel by Eero Saarinen using archival drawings. 2026",
    images: [
      {file:"images/teaching-1.jpg"},
    ]
  },
  {
    term: "a nonprofit website.",
    description: "New website for Shelter Music Boston, a nonprofit that delivers classical music concerts in homeless shelters and recovery sites around Greater Boston. 2025",
    images: [
      {file:"images/SMB-website-1.png"},
      {file:"images/SMB-website-2.png"},
      {file:"images/SMB-website-3.png"}
    ]
  },
  

/*

  {
    term: "public space.",
    category: "ARCHITECTURE · ACADEMIC WORK",
    description: "An academic investigation into the spaces we share, and the ways design can shape access, encounter, and everyday public life.",
    images: [
      {file:"images/public-space-1.svg",label:"Site + context",alt:"Academic public space project placeholder"},
      {file:"images/public-space-2.svg",label:"Design study",alt:"Public space design study placeholder"},
      {file:"images/public-space-3.svg",label:"Drawing",alt:"Public space drawing placeholder"}
    ]
  },
  {
    term: "housing.",
    category: "ARCHITECTURE · ACADEMIC WORK",
    description: "An exploration of domestic space and alternative ways of organizing the relationships between individual life, shared resources, and collective experience.",
    images: [
      {file:"images/housing-1.svg",label:"Concept",alt:"Housing project concept placeholder"},
      {file:"images/housing-2.svg",label:"Spatial study",alt:"Housing spatial study placeholder"},
      {file:"images/housing-3.svg",label:"Model + drawings",alt:"Housing model and drawings placeholder"}
    ]
  }
  */
];

let projectIndex=0, imageIndex=0;
const $=id=>document.getElementById(id);

function renderImage(){
  const project=projects[projectIndex], item=project.images[imageIndex], img=$("project-image");
  img.classList.add("changing");

  window.setTimeout(()=>{
    img.onload = function() {
      img.style.objectFit =
        this.naturalHeight > this.naturalWidth ? "cover" : "contain";
    };

    img.src=item.file;
    img.alt=item.alt;

    $("image-label").textContent=item.label;
    $("image-count").textContent=`${String(imageIndex+1).padStart(2,"0")} / ${String(project.images.length).padStart(2,"0")}`;
    img.classList.remove("changing");
  },150);

  [...$("gallery-dots").children].forEach((dot,i)=>{
    dot.classList.toggle("active",i===imageIndex);
    dot.setAttribute("aria-pressed",i===imageIndex?"true":"false");
  });
}

function renderProject(){
  const p=projects[projectIndex];
  $("project-category").textContent=p.category;
  $("project-term").textContent=p.term;
  $("project-description").textContent=p.description;
  $("project-count").textContent=`${String(projectIndex+1).padStart(2,"0")} / ${String(projects.length).padStart(2,"0")}`;
  $("gallery-dots").innerHTML="";
  p.images.forEach((item,i)=>{
    const dot=document.createElement("button");
    dot.type="button"; dot.className="gallery-dot"+(i===imageIndex?" active":"");
    dot.setAttribute("aria-label",`Show image ${i+1}: ${item.label}`);
    dot.setAttribute("aria-pressed",i===imageIndex?"true":"false");
    dot.addEventListener("click",()=>{imageIndex=i;renderImage();});
    $("gallery-dots").appendChild(dot);
  });
  renderImage();
}
function changeProject(dir){projectIndex=(projectIndex+dir+projects.length)%projects.length;imageIndex=0;renderProject();}
function changeImage(dir){const n=projects[projectIndex].images.length;imageIndex=(imageIndex+dir+n)%n;renderImage();}
$("previous-project").addEventListener("click",()=>changeProject(-1));
$("next-project").addEventListener("click",()=>changeProject(1));
$("previous-image").addEventListener("click",()=>changeImage(-1));
$("next-image").addEventListener("click",()=>changeImage(1));
document.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")changeImage(-1);if(e.key==="ArrowRight")changeImage(1);});
renderProject();
