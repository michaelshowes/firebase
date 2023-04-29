import { useState } from 'react';
import { storage } from '../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';

export default function SendImages() {
	const [fileUpload, setFileUpload] = useState<File>();

	async function uploadFile() {
		if (!fileUpload) return;

		const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

		try {
			await uploadBytes(filesFolderRef, fileUpload);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<input
				type='file'
				onChange={(e) => setFileUpload(e.target.files?.[0])}
			/>
			<button onClick={uploadFile}>Upload File</button>
		</div>
	);
}
