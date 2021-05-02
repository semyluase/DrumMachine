const label = document.querySelector('.label');
const power = document.querySelector('.power');
const bank = document.querySelector('.bank');
const volume = document.querySelector('#volume');
const padDrum = document.querySelectorAll('.drum-pad');
const bankOne = [{
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    },

    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    },

    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    },

    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    },

    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    },

    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    },

    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: 'Kick-n-Hat',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    },

    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    },

    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    },
];

const bankTwo = [{
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
    },

    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
    },

    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
    },

    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
    },

    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
    },

    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
    },

    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
    },

    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
    },

    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    },
];

let powerOn = false;
let bankOn = false;

const loadDoc = () => {
    label.innerHTML = 'OFF';
    volume.value = 0;
    changeBank();
};

function changeBank() {
    padDrum.forEach((drum) => {
        if (bankOn) {
            bankTwo.map((bank) => {
                if (drum.children[0].dataset.key === bank.keyTrigger) {
                    drum.children[0].src = bank.url;
                    drum.children[0].dataset.text = bank.id;
                    drum.children[0].dataset.keypress = bank.keyTrigger;
                }
            });
        } else {
            bankOne.map((bank) => {
                if (drum.children[0].dataset.key === bank.keyTrigger) {
                    drum.children[0].src = bank.url;
                    drum.children[0].dataset.text = bank.id;
                    drum.children[0].dataset.keypress = bank.keyTrigger;
                }
            });
        }
    });
}

volume.addEventListener('input', () => {
    label.innerHTML = 'Volume : ' + volume.value;
    setTimeout(() => {
        if (powerOn) {
            label.innerHTML = 'ON';
            label.style.fontSize = '2rem';
            setTimeout(() => {
                label.innerHTML = 'Please press the drum button';
            }, 2000);
        } else {
            label.innerHTML = 'OFF';
        }
    }, 3000);
});

power.addEventListener('click', () => {
    if (powerOn) {
        powerOn = false;
        label.style.fontSize = '2rem';
        label.innerHTML = 'OFF';
    } else {
        powerOn = true;
        setTimeout(() => {
            label.style.fontSize = '1.3rem';
            label.innerHTML = 'Please press the drum button';
        }, 2000);
    }
});

bank.addEventListener('click', () => {
    if (bankOn) {
        bankOn = false;
        label.innerHTML = 'Drum Bank One';
        changeBank();
    } else {
        bankOn = true;
        label.innerHTML = 'Drum Bank Two';
        changeBank();
    }
});

padDrum.forEach((drum) => {
    drum.addEventListener('click', () => {
        if (powerOn) {
            let sound = drum.children[0];
            sound.volume = volume.value / 100;
            sound.play();
            label.innerHTML = sound.dataset.text;
        } else {
            let sound = drum.children[0];
            sound.volume = 0;
            sound.play();
        }
    });
});

window.document.onkeypress = (event) => {
    let key = event.key.toUpperCase();
    padDrum.forEach((drum) => {
        let sound = drum.children[0];
        if (sound.dataset.keypress === key) {
            if (powerOn) {
                sound.volume = volume.value / 100;
                sound.play();
                label.innerHTML = sound.dataset.text;
            } else {
                sound.volume = 0;
                sound.play();
            }
        }
    });
};

loadDoc();