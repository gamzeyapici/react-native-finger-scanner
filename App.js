import React from 'react';

import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box: {
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        borderRadius: 5,
        position: "relative"
    },
    ellipse: {
        position: 'absolute',
        zIndex: 2,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'lightgray',

        top: 0,
        left: 0
    }
});


class MultiTap extends React.Component {

    onStartShouldSetResponder = (evt) => {
        return this.props.onTap(evt);
    }

    onResponderRelease = () => {
        this.props.onRelease();
    }

    render() {
        return (
            <View
                onStartShouldSetResponder={this.onStartShouldSetResponder}
                onResponderRelease={this.onResponderRelease}
            >
                {this.props.children}
            </View>
        );
    }
}

export default class App extends React.Component {
    state = {
        statusText: "",
        touches: []
    };
    onTap = (event) => {
        if (event.nativeEvent.touches.length === 5 && !this.timeout) {
            this.setState({ statusText: 'SCANNING!', touches: event.nativeEvent.touches });

            return true;
        }

        return false;
    }
    onRelease = () => {
        this.timeout = setTimeout(() => {
            this.setState({ statusText: 'SCAN COMPLETED!', touches: [] });
            this.timeout = null;
        }, 2000);


    }
    render() {
        return (
            <View style={styles.container}>
                <MultiTap onTap={this.onTap} onRelease={this.onRelease}>
                    <TouchableHighlight>
                        <View style={styles.box}>
                            {this.state.touches.map((touch, i) =>
                                <View key={i} style={{ ...styles.ellipse, top: touch.locationY, left: touch.locationX }}></View>)}
                        </View>
                    </TouchableHighlight>

                
                </MultiTap>

                <View>
                <Text style={{ fontSize: 32, backgroundColor: "white", width: "100%", height: 75, zIndex: 4, position: "absolute", bottom: 0, left: 0 }}>
                                {this.state.statusText}
                            </Text>


                </View>
            </View>
        );
    }
}
