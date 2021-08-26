import addPaymentToOrderMutation from './addPaymentToOrderMutation';
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';
import { AddPaymentToOrderParams, Context, PaymentInput, SetPaymentMethodResponse } from '../../types';
import { NO_CACHE_FETCH_POLICY } from '../../helpers';

const setPaymentMethod = async (context: Context, params: AddPaymentToOrderParams, customQuery?: CustomQuery): Promise<SetPaymentMethodResponse> => {
  const setPaymentMethodVariables = {
    input: {
      method: params.method,
      metadata: {
        // Here you would pass data from an external Payment Provided after successful payment process like payment id.
      }
    } as PaymentInput
  };

  const { addPaymentToOrder } = context.extendQuery(
    customQuery, { addPaymentToOrder: { query: addPaymentToOrderMutation, variables: setPaymentMethodVariables } }
  );

  const request = await context.client.mutate({
    mutation: gql`${addPaymentToOrder.query}`,
    variables: addPaymentToOrder.variables,
    fetchPolicy: NO_CACHE_FETCH_POLICY
  }) as SetPaymentMethodResponse;

  return request;
};

export default setPaymentMethod;