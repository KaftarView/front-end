// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { gsap } from "gsap";
// import MorphSVGPlugin from "gsap/MorphSVGPlugin";
// import "./PasswordField.css"; // Import the CSS file

// const PasswordField: React.FC = () => {
//   useEffect(() => {
//     gsap.registerPlugin(MorphSVGPlugin);

//     const fields = document.querySelectorAll(".password-field");
//     fields.forEach((field) => {
//       const input = field.querySelectorAll("input");
//       const button = field.querySelector("button");
//       const time = gsap.timeline({ paused: true }).to(
//         field.querySelector("svg .top"),
//         {
//           morphSVG:
//             "M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5",
//           duration: 0.2,
//         }
//       );

//       time.to(
//         field,
//         {
//           keyframes: [
//             {
//               "--eye-s": 0,
//               "--eye-background": 1,
//               duration: 0.2,
//             },
//             {
//               "--eye-offset": "0px",
//               duration: 0.15,
//             },
//           ],
//         },
//         0
//       );

//       button?.addEventListener("click", () => {
//         if (field.classList.contains("show")) {
//           field.classList.remove("show");
//           time.reverse(0);
//         } else {
//           field.classList.add("show");
//           time.play(0);
//         }
//       });

//       field.addEventListener("pointermove", (e) => {
//         const rect = button?.getBoundingClientRect();
//         if (!rect) return;
//         const x = e.clientX - rect.left - rect.width / 2;
//         const y = e.clientY - rect.top - rect.height / 2;

//         field.style.setProperty("--eye-x", `${x / 15}px`);
//         field.style.setProperty("--eye-y", `${y / 25}px`);
//       });

//       field.addEventListener("pointerleave", () => {
//         field.style.setProperty("--eye-x", "0px");
//         field.style.setProperty("--eye-y", "0px");
//       });

//       input.forEach((i) =>
//         i.addEventListener("input", (e) =>
//           input.forEach((single) => (single.value = e.currentTarget.value))
//         )
//       );
//     });
//   }, []);

//   return (
//     <div className="password-field">
//       <input type="password" placeholder="Password" />
//       <input className="clear" type="text" placeholder="Password" />
//       <button>
//         <svg viewBox="0 0 21 21">
//           <circle className="eye" cx="10.5" cy="10.5" r="2.25" />
//           <path
//             className="top"
//             d="M2 10.5C2 10.5 6.43686 5.5 10.5 5.5C14.5631 5.5 19 10.5 19 10.5"
//           />
//           <path
//             className="bottom"
//             d="M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5"
//           />
//           <g className="lashes">
//             <path d="M10.5 15.5V18" />
//             <path d="M14.5 14.5L15.25 17" />
//             <path d="M6.5 14.5L5.75 17" />
//             <path d="M3.5 12.5L2 15" />
//             <path d="M17.5 12.5L19 15" />
//           </g>
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default PasswordField;
