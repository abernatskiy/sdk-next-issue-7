import {assertNotNull} from '@subsquid/util-internal'
import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {allFields} from './allFields'

export const processor = new EvmBatchProcessor()
    .setRpcEndpoint({
        url: assertNotNull(process.env.RPC_ARBITRUM_ONE_HTTP),
        rateLimit: 10
    })
    .setFinalityConfirmation(300)
    .setFields(allFields)
    .addTransaction({
        to: ['0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'], // USDT
        range: { from: 100_000_000, to: 100_001_000 }
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
