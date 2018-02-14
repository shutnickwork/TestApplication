import {ImageURISource} from "react-native";
import {UrlHelper} from "./UrlHelper";
import {appSettingsProvider} from "../core/settings/appSettingsProvider";
import {ImageResources} from "./ImageResources.g";

export class ImageSource implements ImageURISource {
    constructor(private relativeUri: string) {
        this.uri = UrlHelper.create(this.relativeUri, appSettingsProvider.settings.serverUrl);
    }

    static create(uri: string | null | undefined): ImageURISource {
        if (!uri) {
            return ImageResources.vkontakte_256;
        }

        if (uri.startsWith("http") || uri.startsWith("content")) {
            return {uri};
        } else {
            return new ImageSource(uri);
        }
    }

    uri: string;
    bundle?: string;
    width?: number;
    height?: number;

    toString(): string {
        return this.uri;
    }
}
