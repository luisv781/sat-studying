import { Platform } from 'react-native';
import { WebViewMessageEvent } from 'react-native-webview';

// JS that will send the webview height in order to update it on the RN side
export const heightSetter = `
    function updateHeight() {
        const height = document.body.scrollHeight;
        window.ReactNativeWebView.postMessage(String(height / 3));
    }
    window.addEventListener("load", updateHeight);
    setTimeout(updateHeight, 300);`;

export const checkHeight = (
    event: WebViewMessageEvent,
    setHeight: (newHeight: number) => void,
    viewHeight: number
) => {
    const newHeight = Number(event.nativeEvent.data);
    if (!isNaN(newHeight) && newHeight !== viewHeight) {
        setHeight(newHeight);
    }
};

const toStyledHtml = (html: string, math = true, blackText = true) => {
    return `
    <html>
        <head>
            <style>
                body {
                    margin: 0;
                    padding: 0.8em;
                    font-family: Arial, sans-serif;
                    font-size: ${Platform.OS === 'web' ? '1em' : '3em'};
                    color: ${blackText ? 'black' : 'white'};
                }
            </style>
            ${
                math
                    ? '<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>'
                    : ''
            }
        </head>
        <body>
            ${html}
        </body>
    </html>`;
};

export default toStyledHtml;
