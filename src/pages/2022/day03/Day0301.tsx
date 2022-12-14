import React from "react";
import ExerciseComponent from "../../../components/exercise/ExerciseComponent";
import input from "./input";


class Day0301 extends React.Component<any, any> {
    state: {
        answer: string
    }

    calculateLetterPoint(letter: string): number {
        // As said in the exercise, the values between a -> z and between A -> Z are linear
        // As are the ascii code for alphabet !
        // So if the ascii code is > 90 (Uppercase stops at 89) its a lowercase.
        if (letter.charCodeAt(0) > 90) {
            // Lowercase starts at 1 on our exercise but 97 on ascii table so ascii code - 96 = points
            return letter.charCodeAt(0) - 96;
        } else {
            // Uppercases starts at 27 on our exercise but 65 on ascii table so ascii code - 38 = points
            return letter.charCodeAt(0) - 38;
        }
    }

    execute() {
        let inputParsed = input.split("\n");
        let sum = 0;

        // For each line we need to split in half the strings by compartment
        inputParsed.forEach(item => {
            const partOne = item.slice(0, item.length/2);
            const partTwo = item.slice(item.length/2);

            // For each letter in partOne, we check if we see it on partTwo
            // If that's the case we calculate the points for the letter and add it to the global sum
            for (let i = 0; i < partOne.length; i++) {
                if (partTwo.includes(partOne[i])) {// -> Yes, string.includes() is case sensitive :D
                    sum += this.calculateLetterPoint(partOne[i]);

                    // -> The break statement is here to gain loop iterations but also to avoid multiple letter occurences
                    // If partOne and partTwo share "l" letter, but partOne has it once, partTwo has it twice, we need to add
                    // only once the points :)
                    break;
                }
            }

        });


        this.setState({
            answer: sum.toString()
        });
    }

    constructor(props: null) {
        super(props);

        this.state = {
            answer: ""
        }

        this.execute = this.execute.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Exercise 03 Part 1</h2>
                <ExerciseComponent yearNumber={2022} exerciseNumber={3} answer={this.state.answer} rightAnswer={"7917"} exec={this.execute}/>
            </div>
        );
    }
}

export default Day0301;