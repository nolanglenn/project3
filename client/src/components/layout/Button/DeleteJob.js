import React from 'react';

class DeleteJob extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    deleteJob = () => {
        /* Delete Job From Data Base */
    }

    render() {
        return(
            <div>
                <button className='btn red'>Delete Posting</button>
            </div>
        )
    }
}

export default DeleteJob;