import {TypeormDatabase} from '@subsquid/typeorm-store'
import {Burn} from './model'
import {processor} from './processor'

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    let allNulls = true
    for (let block of ctx.blocks) {
        for (let txn of block.transactions) {
            if (txn.sighash != null) allNulls = false
        }
    }
    if (allNulls) {
        console.log(`All sighashes of USDT txs from block ${ctx.blocks[0].header.height} to ${ctx.blocks[ctx.blocks.length-1].header.height} were nulls`)
    }
})
