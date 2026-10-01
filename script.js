const canvas=document.getElementById("bg");
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.1,100);
camera.position.z=6;
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);

const pts=[];
for(let i=0;i<950;i++) pts.push((Math.random()-.5)*16,(Math.random()-.5)*12,(Math.random()-.5)*10);
const geo=new THREE.BufferGeometry();
geo.setAttribute("position",new THREE.Float32BufferAttribute(pts,3));
const mat=new THREE.PointsMaterial({color:0x8f7cff,size:.018,transparent:true,opacity:.65});
const stars=new THREE.Points(geo,mat);scene.add(stars);

const mesh=new THREE.Mesh(new THREE.IcosahedronGeometry(1.65,2),new THREE.MeshBasicMaterial({color:0x7c5cff,wireframe:true,transparent:true,opacity:.07}));
mesh.position.set(2.8,.3,-2);scene.add(mesh);

let mx=0,my=0;
addEventListener("mousemove",e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2});
function animate(){requestAnimationFrame(animate);stars.rotation.y+=.00035;stars.rotation.x+=.00012;mesh.rotation.x+=.001;mesh.rotation.y+=.0015;mesh.position.x+=(2.8+mx*.25-mesh.position.x)*.015;mesh.position.y+=(.3-my*.2-mesh.position.y)*.015;camera.position.x+=(mx*.12-camera.position.x)*.02;camera.position.y+=(-my*.08-camera.position.y)*.02;camera.lookAt(0,0,0);renderer.render(scene,camera)}
animate();

addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
document.getElementById("menuBtn").onclick=()=>document.querySelector(".nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.querySelector(".nav").classList.remove("open"));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
addEventListener("load",()=>setTimeout(()=>{const l=document.getElementById("loader");l.style.opacity="0";setTimeout(()=>l.remove(),650)},450));