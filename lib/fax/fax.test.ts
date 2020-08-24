import { ErrorMessage } from './errors/ErrorMessage';
import { FaxDTO } from './models/fax.model';
import { HttpClientModule } from '../core/sipgateIOClient';
import { createFaxModule } from './fax';
import validPDFBuffer from './testfiles/validPDFBuffer';

describe('SendFax', () => {
	let mockClient: HttpClientModule;

	beforeAll(() => {
		mockClient = {} as HttpClientModule;
	});

	test('fax is sent', async () => {
		const faxModule = createFaxModule(mockClient);

		mockClient.post = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ data: { sessionId: '123123' } })
			);
		mockClient.get = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ data: { type: 'FAX', faxStatusType: 'SENT' } })
			);

		const to = '+4912368712';
		const fileContent = validPDFBuffer;
		const faxlineId = 'f0';

		await expect(
			faxModule.send({
				faxlineId,
				fileContent,
				filename: 'testPdfFileName',
				to,
			})
		).resolves.not.toThrow();
	});

	test('fax is sent without given filename', async () => {
		mockClient.post = jest
			.fn()
			.mockImplementationOnce((_, { filename }: FaxDTO) => {
				expect(filename && /^Fax_2\d{7}_\d{4}$/.test(filename)).toBeTruthy();
				return Promise.resolve({ data: { sessionId: 123456 } });
			});

		mockClient.get = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ data: { type: 'FAX', faxStatusType: 'SENT' } })
			);

		const faxModule = createFaxModule(mockClient);

		const to = '+4912368712';
		const fileContent = validPDFBuffer;
		const faxlineId = 'f0';

		await faxModule.send({ to, fileContent, faxlineId });
	});
});

describe('GetFaxStatus', () => {
	let mockClient: HttpClientModule;

	beforeAll(() => {
		mockClient = {} as HttpClientModule;
	});

	test('throws exception when fax status could not be fetched', async () => {
		mockClient.get = jest.fn().mockImplementationOnce(() => {
			return Promise.reject({
				response: {
					status: 404,
				},
			});
		});

		const faxModule = createFaxModule(mockClient);

		await expect(faxModule.getFaxStatus('12345')).rejects.toThrowError(
			ErrorMessage.FAX_NOT_FOUND
		);
	});
});
