//Fixed WizardBackground Component

'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Trash2, Edit2, Briefcase, GraduationCap, Bookmark, Eye } from "lucide-react";
import Link from 'next/link';
import Footer from '../components/Footer';

const WizardBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const wizardGroupRef = useRef(null);
  const staffGroupRef = useRef(null);
  const orbGlowRef = useRef(null);
  const particlesMeshRef = useRef(null);
  const magicCircleRef = useRef(null);
  const circleMaterialRef = useRef(null);
  const purpleLightRef = useRef(null);
  const blueLightRef = useRef(null);
  const spellParticlesRef = useRef([]);
  const spellParticlesGeometryRef = useRef(null);
  const spellPositionsRef = useRef(null);
  const spellSizesRef = useRef(null);
  const clockRef = useRef(null);
  const animationIdRef = useRef(null);
  const spellIntervalRef = useRef(null); // Add this ref to track the interval

  useEffect(() => {
    if (!mountRef.current) return;

    // Reset all refs before re-initialization
    sceneRef.current = null;
    rendererRef.current = null;
    cameraRef.current = null;
    controlsRef.current = null;
    wizardGroupRef.current = null;
    staffGroupRef.current = null;
    orbGlowRef.current = null;
    particlesMeshRef.current = null;
    magicCircleRef.current = null;
    circleMaterialRef.current = null;
    purpleLightRef.current = null;
    blueLightRef.current = null;
    spellParticlesRef.current = [];
    spellParticlesGeometryRef.current = null;
    spellPositionsRef.current = null;
    spellSizesRef.current = null;
    clockRef.current = null;
    
    // Clear any existing animation frame
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    
    // Clear any existing interval
    if (spellIntervalRef.current) {
      clearInterval(spellIntervalRef.current);
      spellIntervalRef.current = null;
    }
    
    // Clear any existing canvas
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const init = () => {
      // Clock - initialize first for animation
      clockRef.current = new THREE.Clock();
      
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 2, 5);
      cameraRef.current = camera;

      // Renderer setup with transparent background
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Controls - make them less restrictive
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 3;
      controls.maxDistance = 15;
      controls.enabled = false; // Disable user controls for a more cinematic experience
      controlsRef.current = controls;

      // Lights
      const ambientLight = new THREE.AmbientLight(0x333333, 1.5); // Increase ambient light
      scene.add(ambientLight);

      const purpleLight = new THREE.PointLight(0x8a2be2, 2, 20); // Increase intensity and range
      purpleLight.position.set(-2, 3, 1);
      purpleLight.castShadow = true;
      scene.add(purpleLight);
      purpleLightRef.current = purpleLight;

      const blueLight = new THREE.PointLight(0x0000ff, 1.5, 20); // Increase intensity and range
      blueLight.position.set(2, 3, 1);
      blueLight.castShadow = true;
      scene.add(blueLight);
      blueLightRef.current = blueLight;

      // Ground
      const groundGeometry = new THREE.CircleGeometry(5, 32);
      const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0a0a0a, 
        roughness: 0.8,
        metalness: 0.2
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1;
      ground.receiveShadow = true;
      scene.add(ground);

      // Magic circle
      const circleGeometry = new THREE.RingGeometry(2, 2.1, 64);
      const circleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x8a2be2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const magicCircle = new THREE.Mesh(circleGeometry, circleMaterial);
      magicCircle.rotation.x = -Math.PI / 2;
      magicCircle.position.y = -0.99;
      scene.add(magicCircle);
      magicCircleRef.current = magicCircle;
      circleMaterialRef.current = circleMaterial;

      // Wizard body parts
      const wizardGroup = new THREE.Group();
      scene.add(wizardGroup);
      wizardGroupRef.current = wizardGroup;

      // Robe
      const robeGeometry = new THREE.ConeGeometry(0.8, 2, 8);
      const robeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000055,
        roughness: 0.7,
        metalness: 0.3
      });
      const robe = new THREE.Mesh(robeGeometry, robeMaterial);
      robe.position.y = 0;
      robe.castShadow = true;
      wizardGroup.add(robe);

      // Head
      const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
      const headMaterial = new THREE.MeshStandardMaterial({ color: 0xf5d0c5 });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 1.2;
      head.castShadow = true;
      wizardGroup.add(head);

      // Hat
      const hatGeometry = new THREE.ConeGeometry(0.4, 1, 8);
      const hatMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000099,
        roughness: 0.9,
        metalness: 0.1
      });
      const hat = new THREE.Mesh(hatGeometry, hatMaterial);
      hat.position.y = 1.7;
      hat.castShadow = true;
      wizardGroup.add(hat);

      // Hat brim
      const brimGeometry = new THREE.RingGeometry(0.3, 0.6, 16);
      const brimMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x000099, 
        side: THREE.DoubleSide 
      });
      const brim = new THREE.Mesh(brimGeometry, brimMaterial);
      brim.rotation.x = -Math.PI / 2;
      brim.position.y = 1.2;
      brim.castShadow = true;
      wizardGroup.add(brim);

      // Eyes
      const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.1, 1.25, 0.25);
      wizardGroup.add(leftEye);
      
      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.1, 1.25, 0.25);
      wizardGroup.add(rightEye);
      
      // Beard
      const beardGeometry = new THREE.ConeGeometry(0.25, 0.6, 8);
      const beardMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
      const beard = new THREE.Mesh(beardGeometry, beardMaterial);
      beard.position.set(0, 0.9, 0.1);
      beard.castShadow = true;
      wizardGroup.add(beard);

      // Staff
      const staffGroup = new THREE.Group();
      wizardGroup.add(staffGroup);
      staffGroupRef.current = staffGroup;

      const staffGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
      const staffMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3a3a3a,
        roughness: 0.8,
        metalness: 0.5
      });
      const staff = new THREE.Mesh(staffGeometry, staffMaterial);
      staff.position.set(0.7, 0.4, 0);
      staff.castShadow = true;
      staffGroup.add(staff);

      // Orb on staff
      const orbGeometry = new THREE.SphereGeometry(0.15, 32, 32);
      const orbMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00ffff,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5
      });
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(0.7, 1.4, 0);
      orb.castShadow = true;
      staffGroup.add(orb);

      // Orb glow
      const glowGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.5
      });
      const orbGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      orbGlow.position.copy(orb.position);
      staffGroup.add(orbGlow);
      orbGlowRef.current = orbGlow;

      // Arms
      const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1, 8);
      const armMaterial = new THREE.MeshStandardMaterial({ color: 0x000055 });
      
      // Right arm (holding staff)
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(0.4, 0.7, 0);
      rightArm.rotation.z = Math.PI / 4;
      rightArm.castShadow = true;
      wizardGroup.add(rightArm);
      
      // Left arm
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-0.4, 0.7, 0);
      leftArm.rotation.z = -Math.PI / 4;
      leftArm.castShadow = true;
      wizardGroup.add(leftArm);

      // Particles for magic - make more visible
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCnt = 800; // More particles
      const posArray = new Float32Array(particlesCnt * 3);
      
      for(let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 8; // Wider spread
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.04, // Larger size
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      particlesMeshRef.current = particlesMesh;

      // Magic spell animation
      const spellParticlesGeometry = new THREE.BufferGeometry();
      const spellParticlesCnt = 200; // More particles
      const spellParticles = [];
      
      for(let i = 0; i < spellParticlesCnt; i++) {
        const particle = {
          position: new THREE.Vector3(
            orb.position.x,
            orb.position.y,
            orb.position.z
          ),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
          ),
          acceleration: new THREE.Vector3(0, -0.001, 0),
          life: 0,
          maxLife: 100 + Math.random() * 50,
          size: Math.random() * 0.1 + 0.05,
          active: false
        };
        spellParticles.push(particle);
      }
      
      spellParticlesRef.current = spellParticles;
      
      const spellPositions = new Float32Array(spellParticlesCnt * 3);
      const spellSizes = new Float32Array(spellParticlesCnt);
      
      spellPositionsRef.current = spellPositions;
      spellSizesRef.current = spellSizes;
      
      spellParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(spellPositions, 3));
      spellParticlesGeometry.setAttribute('size', new THREE.BufferAttribute(spellSizes, 1));
      
      spellParticlesGeometryRef.current = spellParticlesGeometry;
      
      const spellMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      const spellMesh = new THREE.Points(spellParticlesGeometry, spellMaterial);
      scene.add(spellMesh);

      // Add stars in the background
      const starsGeometry = new THREE.BufferGeometry();
      const starsCnt = 1500; // More stars
      const starsPositions = new Float32Array(starsCnt * 3);
      
      for(let i = 0; i < starsCnt * 3; i+=3) {
        const radius = 50;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        
        starsPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        starsPositions[i+1] = radius * Math.sin(phi) * Math.sin(theta);
        starsPositions[i+2] = radius * Math.cos(phi);
      }
      
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
      
      const starsMaterial = new THREE.PointsMaterial({
        size: 0.3, // Larger size
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      });
      
      const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starsMesh);

      // Automatically cast spell every 3 seconds
      spellIntervalRef.current = setInterval(castSpell, 3000);

      // Start the animation
      animate();
    };

    const updateSpellParticles = () => {
      const spellParticles = spellParticlesRef.current;
      const spellPositions = spellPositionsRef.current;
      const spellSizes = spellSizesRef.current;
      const spellParticlesGeometry = spellParticlesGeometryRef.current;
      
      if (!spellParticles || !spellPositions || !spellSizes || !spellParticlesGeometry) return;
      
      for(let i = 0; i < spellParticles.length; i++) {
        const p = spellParticles[i];
        
        if(p.active) {
          p.life++;
          
          p.velocity.add(p.acceleration);
          p.position.add(p.velocity);
          
          // Update position buffer
          spellPositions[i * 3] = p.position.x;
          spellPositions[i * 3 + 1] = p.position.y;
          spellPositions[i * 3 + 2] = p.position.z;
          
          // Update size buffer
          const lifeRatio = 1 - p.life / p.maxLife;
          spellSizes[i] = p.size * lifeRatio;
          
          if(p.life >= p.maxLife) {
            p.active = false;
          }
        } else {
          spellPositions[i * 3] = -1000;
          spellPositions[i * 3 + 1] = -1000;
          spellPositions[i * 3 + 2] = -1000;
          spellSizes[i] = 0;
        }
      }
      
      spellParticlesGeometry.attributes.position.needsUpdate = true;
      spellParticlesGeometry.attributes.size.needsUpdate = true;
    };

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (!clockRef.current) return;
      
      const elapsedTime = clockRef.current.getElapsedTime();
      
      // Move camera in a circular motion
      if (cameraRef.current) {
        const radius = 6; 
        const speed = 0.1;
        cameraRef.current.position.x = Math.sin(elapsedTime * speed) * radius;
        cameraRef.current.position.z = Math.cos(elapsedTime * speed) * radius;
        cameraRef.current.lookAt(0, 1, 0);
      }
      
      // Rotate wizard slightly
      if (wizardGroupRef.current) {
        wizardGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.5) * 0.3; // More rotation
        // Add a gentle floating motion
        wizardGroupRef.current.position.y = Math.sin(elapsedTime) * 0.1; // More movement
      }
      
      // Animate staff movement
      if (staffGroupRef.current) {
        staffGroupRef.current.rotation.z = Math.sin(elapsedTime * 0.5) * 0.1; // More movement
      }
      
      // Make orb glow
      if (orbGlowRef.current) {
        orbGlowRef.current.scale.setScalar(1 + Math.sin(elapsedTime * 2) * 0.2); // More pulsing
      }
      
      // Move particles
      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y = elapsedTime * 0.1;
        particlesMeshRef.current.rotation.x = elapsedTime * 0.05;
        particlesMeshRef.current.position.y = Math.sin(elapsedTime) * 0.1;
      }
      
      // Update magic circle
      if (magicCircleRef.current && circleMaterialRef.current) {
        magicCircleRef.current.rotation.z = elapsedTime * 0.2;
        circleMaterialRef.current.opacity = 0.5 + Math.sin(elapsedTime * 2) * 0.3; // More opacity variation
        // Add a pulse effect to the circle
        magicCircleRef.current.scale.setScalar(1 + Math.sin(elapsedTime) * 0.1); // More scaling
      }
      
      // Pulse lights
      if (purpleLightRef.current && blueLightRef.current) {
        purpleLightRef.current.intensity = 2 + Math.sin(elapsedTime * 2) * 0.5; // More intensity variation
        blueLightRef.current.intensity = 1.5 + Math.sin(elapsedTime * 3) * 0.4; // More intensity variation
      }
      
      // Update spell particles
      updateSpellParticles();
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Cast spell function
    const castSpell = () => {
      const spellParticles = spellParticlesRef.current;
      if (!spellParticles || !staffGroupRef.current || !wizardGroupRef.current) return;
      
      for(let i = 0; i < spellParticles.length; i++) {
        const p = spellParticles[i];
        
        if (staffGroupRef.current.children.length >= 2) {
          const orbPos = staffGroupRef.current.children[1].position;
          
          p.position.set(
            orbPos.x + staffGroupRef.current.position.x + wizardGroupRef.current.position.x, 
            orbPos.y + staffGroupRef.current.position.y + wizardGroupRef.current.position.y, 
            orbPos.z + staffGroupRef.current.position.z + wizardGroupRef.current.position.z
          );
          
          p.velocity.set(
            (Math.random() - 0.5) * 0.3, // Faster particles
            Math.random() * 0.2 + 0.05,  // Faster particles
            (Math.random() - 0.5) * 0.3  // Faster particles
          );
          
          p.life = 0;
          p.active = true;
        }
      }
    };

    // Initialize
    init();
    
    // Event listeners
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      
      if (spellIntervalRef.current) {
        clearInterval(spellIntervalRef.current);
        spellIntervalRef.current = null;
      }
      
      if (rendererRef.current && rendererRef.current.domElement && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

const UserPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          router.push('/Login');
          return;
        }

        const response = await axios.get(
          `http://ec2-13-203-197-138.ap-south-1.compute.amazonaws.com/api/templates/user/${userId}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        setTemplates(response.data.message === "No templates found" ? [] : response.data);
      } catch (error) {
        console.error('Fetch Error:', error);
        if (error.response?.status === 401) {
          localStorage.clear();
          router.push('/Login');
        } else {
          setError(error.response?.data?.error || 'Failed to fetch templates');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [router]);
  // Flash message function
function showFlashMessage(message, type) {
  // Create flash message element
  const flashMessage = document.createElement("div");
  flashMessage.className = `flash-message ${type}`;
  
  // Create message content
  const content = document.createElement("div");
  content.className = "flash-content";
  
  // Add icon based on type
  const icon = document.createElement("span");
  icon.className = "flash-icon";
  icon.innerHTML = type === "success" 
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
  
  // Add message text
  const text = document.createElement("span");
  text.textContent = message;
  
  // Assemble flash message
  content.appendChild(icon);
  content.appendChild(text);
  flashMessage.appendChild(content);
  
  // Add close button
  const closeBtn = document.createElement("button");
  closeBtn.className = "flash-close";
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => document.body.removeChild(flashMessage);
  flashMessage.appendChild(closeBtn);
  
  // Add to DOM
  document.body.appendChild(flashMessage);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(flashMessage)) {
      flashMessage.classList.add("fade-out");
      setTimeout(() => {
        if (document.body.contains(flashMessage)) {
          document.body.removeChild(flashMessage);
        }
      }, 300);
    }
  }, 5000);
}
function showConfirmDialog(title, message, onConfirm) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "confirm-overlay";
  
  // Create dialog
  const dialog = document.createElement("div");
  dialog.className = "confirm-dialog";
  
  // Create title
  const dialogTitle = document.createElement("h3");
  dialogTitle.className = "confirm-title";
  dialogTitle.textContent = title;
  
  // Create message
  const dialogMessage = document.createElement("p");
  dialogMessage.className = "confirm-message";
  dialogMessage.textContent = message;
  
  // Create buttons container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "confirm-buttons";
  
  // Create cancel button
  const cancelButton = document.createElement("button");
  cancelButton.className = "confirm-button cancel";
  cancelButton.textContent = "Cancel";
  cancelButton.onclick = () => document.body.removeChild(overlay);
  
  // Create confirm button
  const confirmButton = document.createElement("button");
  confirmButton.className = "confirm-button confirm";
  confirmButton.textContent = "Delete";
  confirmButton.onclick = () => {
    document.body.removeChild(overlay);
    onConfirm();
  };
  
  // Assemble dialog
  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(confirmButton);
  dialog.appendChild(dialogTitle);
  dialog.appendChild(dialogMessage);
  dialog.appendChild(buttonContainer);
  overlay.appendChild(dialog);
  
  // Add to DOM
  document.body.appendChild(overlay);
}


const handleDelete = async (templateId) => {
  // Show custom confirmation dialog instead of window.confirm
  showConfirmDialog(
    "Delete Template", 
    "Are you sure you want to delete this template?",
    async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `http://ec2-13-203-197-138.ap-south-1.compute.amazonaws.com/api/templates/deletetemplate/${templateId}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        setTemplates(prev => prev.filter(t => t.id !== templateId));
        
        // Show success flash message
        showFlashMessage("Template deleted successfully", "success");
      } catch (error) {
        // Show error flash message
        showFlashMessage(`Deletion failed: ${error.response?.data?.detail || error.message}`, "error");
      }
    }
  );
};
  const handleCreateNew = () => router.push('/Create-template');

  if (error) return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-red-500 text-xl font-semibold mb-2">Error</div>
        <p>{error}</p>
        <button 
          onClick={() => router.push('/Login')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );



  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/avatar.jpeg')", // Replace with your actual image path
            filter: "blur(8px)"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-black/70"></div>
      </div>
      
      {/* Loading content */}
      <div className="z-10 flex flex-col items-center">
        {/* Glowing circle container */}
        <div className="relative h-24 w-24 mb-8">
          {/* Outer spinning ring with glow */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-400/30 animate-spin shadow-lg shadow-purple-500/30"></div>
          
          {/* Middle spinning ring */}
          <div className="absolute inset-2 rounded-full border-4 border-t-pink-500 border-r-pink-500 border-b-transparent border-l-transparent animate-spin-slow"></div>
          
          {/* Inner spinning ring */}
          <div className="absolute inset-4 rounded-full border-4 border-t-transparent border-r-transparent border-b-purple-500 border-l-purple-500 animate-spin-reverse"></div>
          
          {/* Center gradient circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse shadow-lg shadow-purple-500/50"></div>
          </div>
        </div>
      
        {/* Loading text */}
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 font-semibold text-xl animate-pulse">
          Loading your templates...
        </p>
        
        {/* Optional subtlety */}
        <p className="text-gray-400 text-sm mt-2 max-w-xs text-center">
          Preparing your creative workspace
        </p>
      </div>
    </div>
  );
  



  


  return (
    <>
      <div className="min-h-screen bg-indigo-900 relative">
        <WizardBackground />
        
        <div className="relative z-10 bg-gradient-to-b from-indigo-00/90 to-gray-800/85 min-h-screen backdrop-bl-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-12 p-10 py-40">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                My Resume Templates
              </h1>
            </div>
    
            {templates.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-300 text-xl mb-8">
                  No templates found. Create your first resume template!
                </p>
                <div
                  className="relative bg-gradient-to-br from-purple-900/20 to-pink-800/20 border border-purple-500/30 rounded-xl p-6 transform transition-all duration-500 shadow-xl hover:shadow-2xl backdrop-blur-md group max-w-md mx-auto cursor-pointer hover:scale-105"
                  onClick={handleCreateNew}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-5 mb-4 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                      <span className="text-4xl text-white">+</span>
                    </div>
                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-purple-300 group-hover:to-pink-400 transition-all duration-300">Create New Template</h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Create New Template Card */}
                <div
                  className="relative bg-gradient-to-br from-purple-900/20 to-pink-800/20 border border-purple-500/30 rounded-xl p-6 transform transition-all duration-500 shadow-xl hover:shadow-purple-500/20 backdrop-blur-md group cursor-pointer hover:scale-105"
                  onClick={handleCreateNew}
                  style={{
                    animation: "fadeInUp 0.6s ease-out 0s both"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-5 mb-4 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                      <span className="text-4xl text-white">+</span>
                    </div>
                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-purple-300 group-hover:to-pink-400 transition-all duration-300">Create New Template</h3>
                    <p className="text-gray-400 mt-2 text-center group-hover:text-gray-300 transition-colors duration-300">Start your next masterpiece</p>
                  </div>
                </div>
                
                {/* Template Cards */}
                {templates.map((template, index) => (
                  <div
                    key={template.id}
                    className="relative bg-black rounded-xl p-6 transform transition-all duration-500 shadow-xl hover:shadow-2xl backdrop-blur-md group"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${(index + 1) * 0.1}s both`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-900/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-white">
                        {template.about || 'Untitled Template'}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {new Date(template.metadata?.created).toLocaleDateString()}
                      </span>
                    </div>
    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200">
                        <Briefcase className="h-5 w-5 mr-2 text-purple-400" />
                        <span>{template.experiences?.length || 0} Experiences</span>
                      </div>
                      
                      <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200">
                        <GraduationCap className="h-5 w-5 mr-2 text-blue-400" />
                        <span>{template.educations?.length || 0} Education Entries</span>
                      </div>
    
                      <div className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-200">
                        <Bookmark className="h-5 w-5 mr-2 text-green-400" />
                        <span>{template.skills?.length || 0} Skills</span>
                      </div>
                    </div>
    
                    <div className="flex justify-end space-x-3 border-t border-gray-700 pt-4">
                      <Link
                        href={{pathname:"/edit", query:{id:template.id}}}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 transform hover:scale-110"
                      >
                        <Edit2 className="h-5 w-5 text-blue-400" />
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 transform hover:scale-110"
                      >
                        <Trash2 className="h-5 w-5 text-red-400" />
                      </button>
                      
                      <Link
                        href={{pathname: "/SingleTemplate", query: {id: template.id}}}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 transform hover:scale-110"
                      >
                        <Eye className="h-5 w-5 text-purple-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
  };


  export default UserPage;