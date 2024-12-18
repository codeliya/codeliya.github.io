const TEXT = [
  {
    id: "n8abp6kko7",
    content: "Loading",
    html: `<span class="loader">Loading</span>`,
    css: `.loader {
  font-size: 48px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  display: inline-block;
  color: var(--dark);
  letter-spacing: 2px;
  position: relative;
  box-sizing: border-box;
}

.loader::after {
  content: 'Loading';
  position: absolute;
  left: 0;
  top: 0;
  color: #FFF;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  animation: animloader 5s linear infinite;
}

@keyframes animloader {
  0% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}
`,
  },
];