let date = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

module.exports = [
    { 
      id: 11,
      name: 'Echo Bot',
      description: 'Lorem ipsum dolor sit amet',
      status: true,
      image: 'https://image.flaticon.com/icons/svg/145/145852.svg',
      messages: [{
        id: Date.now(),
        author: 'Echo Bot',
        text: 'Hello, I repeat everything you send!',
        date: date      
      }]
    },
    { 
      id: 12, 
      name: 'Reverse Bot', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 
      status: true,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0vzhZ7tBFaiTA3om-AVJa4SM23T0AlP5U8Mvs_xBPsw__kU2h',
      messages: [{
        id: Date.now(),
        author: 'Reverse Bot',
        text: 'Hi, I\'m Reverse Bot!',
        date: date      
      }]
    },
    { id: 13, 
      name: 'Spam Bot', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,', 
      status: true,
      image: 'https://image.flaticon.com/icons/svg/145/145852.svg',
      messages: []
    },
    { id: 14, 
      name: 'Ignore Bot', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,', 
      status: true,
      image: 'https://image.flaticon.com/icons/svg/145/145852.svg',
      messages: [{
        id: Date.now(),
        author: 'Ignore Bot',
        text: 'Do not text me..',
        date: date      
      }]
    },
    { id: 15, 
      name: 'Not Online Bot', 
      description: 'Lorem ipsum', 
      status: false,
      image: 'https://image.flaticon.com/icons/svg/145/145852.svg',
      messages: []
    }
  ];