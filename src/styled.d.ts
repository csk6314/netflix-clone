import "styled-components";

declare module "styled-componenets" {
    export interface DefaultTheme {
        red:string;
        black:{
            veryDark:string;
            darker:string;
            lighter:string;
        };
        white: {
            darker:string;
            lighter:string;
        };
    }
}
export interface IDefaultTheme {
    red:string;
    black:{
        veryDark:string;
        darker:string;
        lighter:string;
    };
    white: {
        darker:string;
        lighter:string;
    };
}