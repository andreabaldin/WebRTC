var videoElement: HTMLVideoElement;
var canvasElement: HTMLCanvasElement;
var snapShotButton: HTMLButtonElement;

export class Camera {

	constructor() {
	}

	start() {
		navigator.mediaDevices.getUserMedia({ video: true, audio: false })
			.then(function (stream) {
				console.log("start");
				videoElement = <HTMLVideoElement>document.querySelector("video");
				canvasElement = <HTMLCanvasElement>document.querySelector("canvas");
				snapShotButton = <HTMLButtonElement>document.getElementById("snapshot");
				if (videoElement) {
					videoElement.controls = true;
					snapShotButton.hidden = false;
					videoElement.srcObject = stream;
				}
				else
					console.error("videoElement empty");
			})
			.catch(function (error) {
				let videoError = <HTMLLabelElement>document.getElementById("videoError");
				videoError.innerHTML = error.toString();
			});
	}

	stop() {
		console.log("stop");
		if (videoElement) {
			videoElement.controls = false;
			if (videoElement) {
				let stream = videoElement.srcObject;
				if (stream) {
					let tracks = stream.getTracks();
					tracks.forEach(function (track) {
						track.stop();
					});
				}
			}
			videoElement.srcObject = null;
		}
	};

	snapshot() {
		navigator.mediaDevices.getUserMedia({ video: true, audio: false })
			.then(function (stream) {
				console.log("snapshot");
				let context = canvasElement.getContext('2d');
				if (context)
					context.drawImage(videoElement, 0, 0, 300, 200);
			})
			.catch(function (error) {
				let videoError = <HTMLLabelElement>document.getElementById("videoError");
				videoError.innerHTML = error.toString();
			});
	}

}

interface Navigator {
	getUserMedia(
		options: { video?: boolean; audio?: boolean; },
		success: (stream: any) => void,
		error?: (error: string) => void
	): void;
	SenderName: string;
	Text: string;
}

