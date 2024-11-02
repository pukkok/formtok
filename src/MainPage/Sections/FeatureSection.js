import React from 'react';
import styled from 'styled-components';
import FeatureCard from './Partials/FeatureCard';

function FeatureSection({ contents }) {
	return (
		<StyledFeatureSection>
			<FeatureContainer>
				{contents.map(item => {
					const {describe, headLine, content} = item
					return <FeatureCard 
						key={describe}
						describe={describe} 
						headLine={headLine} 
						content={content}
					/>
				})}
			</FeatureContainer>
		</StyledFeatureSection>
	)
}

export default FeatureSection;

const StyledFeatureSection = styled.section`
	padding: 20px;
	background-color: #fff;
	display: flex;
	
	flex-direction: column;
	align-items: center;

	@keyframes moveToHigh {
		0%{
			top: 100vh;
		}
		100%{
			top: -15vh;
		}
	}
`;

const FeatureContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-end;
	gap: 40px;
	width: 100%;
	max-width: var(--pk-container);
`