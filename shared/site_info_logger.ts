export function logAuthors() {
    const libs = [
        'mobx',
        'tailwindcss', 
        'react-query', 
        'react-modifier',
        'react-responsive',
        'react-syntax-highlighter',
        'pure-react-carousel'
    ];

    const kostayneBaner = `
 /$$   /$$                       /$$                                            
| $$  /$$/                      | $$                                            
| $$ /$$/   /$$$$$$   /$$$$$$$ /$$$$$$    /$$$$$$  /$$   /$$ /$$$$$$$   /$$$$$$ 
| $$$$$/   /$$__  $$ /$$_____/|_  $$_/   |____  $$| $$  | $$| $$__  $$ /$$__  $$
| $$  $$  | $$  \\ $$|  $$$$$$   | $$      /$$$$$$$| $$  | $$| $$  \\ $$| $$$$$$$$
| $$\\  $$ | $$  | $$ \\____  $$  | $$ /$$ /$$__  $$| $$  | $$| $$  | $$| $$_____/
| $$ \\  $$|  $$$$$$/ /$$$$$$$/  |  $$$$/|  $$$$$$$|  $$$$$$$| $$  | $$|  $$$$$$$
|__/  \\__/ \\______/ |_______/    \\___/   \\_______/ \\____  $$|__/  |__/ \\_______/
                                                   /$$  | $$                    
                                                  |  $$$$$$/                    
                                                   \\______/                   `;

    console.log(kostayneBaner);

    console.groupCollapsed('Author info')
    console.log('https://github.com/Kostayne');
    console.log('kostayne-dev@yandex.ru');
    console.groupEnd();

    console.groupCollapsed('Used libs here: ')
    libs.forEach(l => {
        console.log(` * ${l}`);
    });
    console.groupEnd();

}