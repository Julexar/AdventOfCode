const fs = require('fs');
const compareValues = (value1, operator, value2) => (operator === '<' ? value1 < value2 : value1 > value2);

const input = fs.readFileSync("./Aplenty/text.txt", "utf-8");
const [workflowStr, partStr] = input.trim().split("\n\n");

const workflowEntries = [...workflowStr.split("\n")].map(workflowString => {
    const name = /^\w+/.exec(workflowString)[0];
    const rules = [...workflowString.matchAll(/([xmas])([<>])(\d+):(\w+)/g)].map(match => ({
        type: match[1],
        operator: match[2],
        value: parseInt(match[3]),
        target: match[4]
    }));

    const defaultTarget = /,(\w+)\}$/.exec(workflowString)[1];
    const workflow = {
        rules,
        defaultTarget
    };

    return [name, workflow];
})

const workflows = Object.fromEntries(workflowEntries);

const parts = partStr.split("\n").map(partString => {
    const partEntries = [...partString.matchAll(/([xmas])=(\d+)/g)].map(match => [match[1], parseInt(match[2])]);
    const part = Object.assign(Object.fromEntries(partEntries), { history: [] });

    return part;
});

const job = { parts, workflows };

let part1Total = 0;
for (const part of job.parts) {
    let curWorkflow = "in";
    part.history.push(curWorkflow);

    while (curWorkflow !== "R" && curWorkflow !== "A") {
        const workflow = job.workflows[curWorkflow];

        curWorkflow = workflow.rules
        .find(rule => compareValues(part[rule.type], rule.operator, rule.value))?.target
        ?? workflow.defaultTarget;

        part.history.push(curWorkflow);
    }

    if (curWorkflow === "A") {
        part1Total += part.total = part.x + part.m + part.a + part.s;
    }
}

console.log("Part 1 Solution:", part1Total);

const calcRangeSize = range => range[1] - range[0];
const calcBatchSize = batch => calcRangeSize(batch.x) * calcRangeSize(batch.m) * calcRangeSize(batch.a) * calcRangeSize(batch.s);

const acceptedBatches = [];

function countAccepted(batch, curWorkflow, history) {
    if (curWorkflow === "R") return 0;

    history = history.concat(curWorkflow);

    if (curWorkflow === "A") {
        const size = calcBatchSize(batch);

        acceptedBatches.push({batch, history, size});

        return size;
    }

    let result = 0;
    const workflow = workflows[curWorkflow];

    for (const rule of workflow.rules) {
        const range = batch[rule.type];

        switch (rule.operator) {
            case "<":
                if (range[1] <= rule.value) {
                    result += countAccepted(batch, rule.target, history);

                    return result;
                } else if (range[0] < rule.value) {
                    const matchedPart = { ...batch, [rule.type]: [range[0], rule.value] };
                    result += countAccepted(matchedPart, rule.target, history);

                    batch = { ...batch, [rule.type]: [rule.value, range[1]] };

                    continue;
                }
            break;
            case ">":
                if (range[0] > rule.value) {
                    result += countAccepted(batch, rule.target, history);

                    return result;
                } else if (range[1] > rule.value + 1) {
                    const matchedPart = { ...batch, [rule.type]: [rule.value + 1, range[1]] };
                    result += countAccepted(matchedPart, rule.target, history);

                    batch = { ...batch, [rule.type]: [range[0], rule.value + 1] };

                    continue;
                }
            break;
        }
    }

    result += countAccepted(batch, workflow.defaultTarget, history);

    return result;
}

const part2Total = countAccepted({x: [1, 4001], m: [1, 4001], a: [1, 4001], s: [1, 4001]}, "in", []);

console.log("Part 2 Solution:", part2Total);