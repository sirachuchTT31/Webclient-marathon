export class UtilCovert {

    public jsonCovertObject(json: any): string {
        if (!json) return "";

        return JSON.parse(json);
    }
}