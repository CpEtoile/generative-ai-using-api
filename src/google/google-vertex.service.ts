import {
  EndpointServiceClient,
  PredictionServiceClient,
} from '@google-cloud/aiplatform';
import { Injectable } from '@nestjs/common';

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = 'opus-dev-hmbu-cdp';
const location = 'us-central1';

const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};
const predictionServiceClient = new PredictionServiceClient(clientOptions);

PredictionServiceClient.log;

// Specifies the location of the api endpoint
const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};
const client = new EndpointServiceClient(clientOptions);

@Injectable()
export class GoogleVertexService {
  async listEndpoints() {
    // Configure the parent resource
    const parent = `projects/${projectId}/locations/${location}`;
    const request = {
      parent,
    };

    // Get and print out a list of all the endpoints for this resource
    const [result] = await client.listEndpoints(request);
    for (const endpoint of result) {
      console.log(`\nEndpoint name: ${endpoint.name}`);
      console.log(`Display name: ${endpoint.displayName}`);
      if (endpoint.deployedModels[0]) {
        console.log(
          `First deployed model: ${endpoint.deployedModels[0].model}`,
        );
      }
      return endpoint.name;
    }
  }

  async predictCustomerTrainedModel() {}
}
